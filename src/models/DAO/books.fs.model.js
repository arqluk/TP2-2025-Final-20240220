// A implementar ....

// import fs from "fs";

// class VotesFsModel {
//     constructor() {
//         this.filePath = "./votes.json";
//         this.initializeFile();
//     }

//     // constructor() {
//     //     this.entities = "votes.json"
//     // }

//     initializeFile = async () => {
//         try {
//             await fs.promises.access(this.filePath);
//         } catch {
//             await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 2));
//         }
//     };

//     getAllVotes = async () => {
//         const votes = await fs.promises.readFile(this.filePath, "utf-8");
//         return JSON.parse(votes);
//     };

//     postVotes = async (vote) => {
//         const votes = await fs.promises.readFile(this.filePath, "utf-8");
//         let votesJs = JSON.parse(votes)

//         const { id, xa, ya, za } = vote
//         const index = votesJs.findIndex((a) => a.id == id)
//         const collisions = await this.checkCollisions(vote)
//         if (index === -1) {
//             votesJs.push({ id, xa, ya, za })
//         } else {
//             // votesJs[index] = {id, xa, ya, za}

//             votesJs[index] = {
//                 ...votesJs[index], // conserva propiedades previas
//                 id,
//                 xa,
//                 ya,
//                 za
//             };
//         }

//         await fs.promises.writeFile(this.filePath, JSON.stringify(votesJs, null, 2))

//         return {
//             vote: { id, xa, ya, za },
//             collisions: collisions
//         }
//     };

//     deleteVotes = async (identifier) => {
//         const votes = await fs.promises.readFile(this.filePath, "utf-8");
//         let votesJs = JSON.parse(votes)
//         const index = votesJs.findIndex((a) => a.id === identifier)
//         let msg = ""
//         if (index === -1) {
//             msg = "Aircratf inexistent"
//         }
//         else {
//             votesJs.splice(index, 1)
//             await fs.promises.writeFile(this.filePath, JSON.stringify(votesJs, null, 2))
//             msg = "Aircratf removed ok."
//         }
//         return msg
//     };

//     checkCollisions = async (newVote) => {
//         const votes = await fs.promises.readFile(this.filePath, "utf-8");
//         let votesJs = JSON.parse(votes)
//         const collisionsIds = []

//         if (votesJs.length !== 0) {
//             for (const vote of votesJs) {
//                 if (vote.id === newVote.id) {
//                     continue
//                 }
//                 const distance = this.calculateDistance(newVote, vote)
//                 if (distance < 500) {
//                     collisionsIds.push(vote.id)
//                 }
//             }
//         }

//         // for (const vote of this.votes) {
//         //     if (vote.id === newVote.id) {
//         //         continue
//         //     }
//         //     const distance = this.calculateDistance(newVote, vote)
//         //     if (distance < 500) {
//         //         collisionsIds.push(vote.id)
//         //     }
//         // }

//         return collisionsIds
//     }


//     calculateDistance = (vote1, vote2) => {
//         const dx = vote1.xa - vote2.xa;
//         const dy = vote1.ya - vote2.ya;
//         const dz = vote1.za - vote2.za;
//         return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
//     }


// }

// export default VotesFsModel;