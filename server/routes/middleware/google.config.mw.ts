// import passport from 'passport';
// import passportGoogle, {StrategyOptions, Profile, VerifyCallback} from 'passport-google-oauth20';
// import mysql from 'mysql';
// import dbConfig from '../../services/dbConfig';

// const GoogleStrategy = passportGoogle.Strategy;

// const options: StrategyOptions = {
//   clientID: process.env.GOOGLE_CLIENT_ID as string,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   callbackURL: 'http://localhost:4000/authentication/redirect/google',
//   scope: ['profile'],
//   state: true,
// };

// function verify(
//   accessToken: string,
//   refreshToken: string,
//   profile: Profile,
//   done: VerifyCallback
//   ) {
//     console.log('google config file');
//   }
  
//   passport.use(new GoogleStrategy(options, verify));

