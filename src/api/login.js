// import cookie from "universal-cookie";

// export default (req, res) => {
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("lallantop", req.body.token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 60 * 60,
//       sameSite: "strict",
//       path: "/",
//     })
//   );
//   res.statusCode = 200;
//   res.json({ success: true });
// };