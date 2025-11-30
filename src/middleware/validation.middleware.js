// import Joi from "joi";

// const validateDistrict = (req, res, next) => {
//     console.log("DEBUG validateDistrict - req.body:", req.body);

//     const bookIdSchema = Joi.object({
//         distrito: Joi.string()
//             .valid("zona1", "zona2", "zona3", "zona4")
//             .required()
//     });

//     const { error } = bookIdSchema.validate({ distrito: req.body.distrito });

//     if (error) {
//         return res.status(400).json({
//             error: "zona no correspondiente"
//         });
//     }

//     next();
// };

// const validateCandidate = (req, res, next) => {
//     console.log("DEBUG validateCandidate - req.body:", req.body);

//     const bookCandidateSchema = Joi.object({
//         candidato: Joi.string()
//             .valid("candidatoA", "candidatoB", "candidatoC", "enblanco")
//             .required()
//     });

//     const { error } = bookCandidateSchema.validate({ candidato: req.body.candidato });

//     if (error) {
//         return res.status(400).json({
//             error: "candidato no válido"
//         });
//     }

//     next();
// };

// export default {
//     validateDistrict,
//     validateCandidate,
// };
