// const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/i6OiNUavZ2OszfY3wkNT/scores/'

// // export default function displaydata() {
// //     fetch(url, { mode: "cors", })
// //       .then(function (response) {
// //         // console.log(response.json());
// //         return response.json();

// //       })
// //       .catch((e) => {
// //         alert( e + " nothing found");
// //       })

// //     }

// export default async function displaydata() {

//   const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/i6OiNUavZ2OszfY3wkNT/scores/`;

//   const response = await fetch(url);
//   // if HTTP-status is 200-299
//   // get the response body (the method explained below)
//   if (response.ok) {
//    json1 = await response.json();
//    console.log(json1)
//    return json1;

//   }
//   else {
//     return error.json()
//   }
// }

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    return error;
  }
};

const sortPlayers = (arr) => {
  arr.sort((a, b) => a.score - b.score);
};

const getPlayers = async (url) => {
  const arr = await getData(url);
  sortPlayers(arr);
  return arr;
};

export { getData, getPlayers };