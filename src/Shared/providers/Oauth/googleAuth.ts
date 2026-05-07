// import { prisma } from "Config/Prisma/prisma";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// import { zEnv } from "@Shared/Util/Env/SchemaEnv";
// import { AppError } from "@Shared/Util/Errors/AppError";
// import { generateToken } from "@Shared/Util/Helpers/GenerateJwtToken";
// import { handleGenerateUuid } from "@Shared/features/handleGenerateUuid/handleGenerateUuid";

// const googleConfig = {
// 	clientID: zEnv.OAUTH.GOOGLE.CLIENT_ID,
// 	clientSecret: zEnv.OAUTH.GOOGLE.CLIENT_SECRET,
// };

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			...googleConfig,
// 			callbackURL: zEnv.OAUTH.GOOGLE.LINKS.LOGIN.CALLBACK,
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			try {
// 				let user = await prisma.user.findFirst({
// 					where: {
// 						profiles: {
// 							some: {
// 								provider: "GOOGLE",
// 								providerId: profile.id,
// 							},
// 						},
// 					},
// 				});

// 				if (!user) {
// 					user = await prisma.user.create({
// 						data: {
// 							id: handleGenerateUuid(),
// 							name: profile.displayName,
// 							avatar: profile._json.picture,
// 							profiles: {
// 								create: {
// 									provider: "GOOGLE",
// 									providerId: profile.id,
// 									providerEmail: profile.emails![0].value,
// 								},
// 							},
// 						},
// 					});
// 				}

// 				const token = generateToken({ email: user.email, id: user.id });
// 				return done(null, { user, token });
// 			} catch (err) {
// 				return done(err, false);
// 			}
// 		},
// 	),
// );

// passport.use(
// 	"google-sync",
// 	new GoogleStrategy(
// 		{ ...googleConfig, callbackURL: zEnv.OAUTH.GOOGLE.LINKS.SYNC.CALLBACK, passReqToCallback: true },
// 		async (req, accessToken, refreshToken, profile, done) => {
// 			try {
// 				const id = req.query.state as string;
// 				const user = await prisma.user.findFirst({
// 					where: { id },
// 					include: {
// 						profiles: true,
// 					},
// 				});

// 				if (!user) {
// 					throw new AppError({ message: "not found", codeIntern: "1" });
// 				}

// 				if (user && user.profiles.some((profile) => profile.provider === "GOOGLE")) {
// 					throw new AppError({ message: "not found", codeIntern: "2" });
// 				}

// 				if (user) {
// 					await prisma.profile.create({
// 						data: {
// 							userId: user.id,
// 							provider: "GOOGLE",
// 							providerId: profile.id,
// 							providerEmail: profile.emails![0].value,
// 						},
// 					});
// 				}

// 				return done(null, profile);
// 			} catch (error) {
// 				if (error instanceof AppError) {
// 					return done(error, false, { message: error.content.message });
// 				}
// 				return done(error, false, { message: "deu algum erro ao linkar as contas" });
// 			}
// 		},
// 	),
// );

// export default passport;
