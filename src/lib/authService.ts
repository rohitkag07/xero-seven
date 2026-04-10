// Authentication service using InsForge SDK
import { insforge } from './insforge';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  company?: string;
  role: 'user' | 'admin' | 'agent';
  teamId?: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName: string;
  company?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

class AuthService {
  /**
   * Sign up a new user with email and password
   */
  async signUp(input: SignUpInput): Promise<{ user: AuthUser; token: string }> {
    try {
      const { data, error } = await insforge.auth.signUp({
        email: input.email,
        password: input.password,
        name: input.fullName,
      });

      if (error) throw error;
      if (!data?.user) throw new Error('Sign up failed');

      // Create user profile in auth_users table
      const { data: profile, error: profileError } = await insforge.database
        .from('auth_users')
        .insert([{
          auth_id: data.user.id,
          email: data.user.email,
          full_name: input.fullName,
          company: input.company,
          role: 'user',
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      return {
        user: this.mapAuthUser(profile),
        token: data.accessToken || '',
      };
    } catch (error) {
      throw new Error(`Sign up failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(input: SignInInput): Promise<{ user: AuthUser; token: string }> {
    try {
      const { data, error } = await insforge.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) throw error;
      if (!data?.user) throw new Error('Sign in failed');

      // Fetch user profile
      const { data: profile, error: profileError } = await insforge.database
        .from('auth_users')
        .select()
        .eq('auth_id', data.user.id)
        .single();

      if (profileError) {
        console.warn('Profile not found, creating new profile');
        // Create profile if it doesn't exist
        const { data: newProfile } = await insforge.database
          .from('auth_users')
          .insert([{
            auth_id: data!.user!.id,
            email: data!.user!.email,
            role: 'user',
          }])
          .select()
          .single();

        return {
          user: this.mapAuthUser(newProfile),
          token: data.accessToken || '',
        };
      }

      return {
        user: this.mapAuthUser(profile),
        token: data.accessToken || '',
      };
    } catch (error) {
      throw new Error(`Sign in failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      const { error } = await insforge.auth.signOut();
      if (error) throw error;
    } catch (error) {
      throw new Error(`Sign out failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get current user session
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data, error } = await insforge.auth.getCurrentUser();

      if (error || !data?.user) return null;

      const user = data.user;

      // Fetch user profile
      const { data: profile } = await insforge.database
        .from('auth_users')
        .select()
        .eq('auth_id', user.id)
        .single();

      return profile ? this.mapAuthUser(profile) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Listen to auth state changes - (Deprecated in this SDK, handled by AuthContext)
   */
  onAuthStateChange(_callback: (user: AuthUser | null) => void): () => void {
    // We don't have realtime auth state changes in this SDK,
    // so we just return a no-op function. If needed, we do polling
    // or rely on explicit signIn/signOut calls updating context.
    return () => {};
  }

  /**
   * Reset password
   */
  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await insforge.auth.sendResetPasswordEmail({ email });
      if (error) throw error;
    } catch (error) {
      throw new Error(`Password reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Map database profile to AuthUser
   */
  private mapAuthUser(profile: any): AuthUser {
    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      company: profile.company,
      role: profile.role || 'user',
      teamId: profile.team_id,
    };
  }
}

export const authService = new AuthService();
