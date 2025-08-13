function getImgUrl(name){
return new URL(`../assets/img/${name}`, import.meta.url).href
}
export {getImgUrl}
// function getImgUrl(name) {
//   if (!name) {
//     console.log("⚠️ Image name is undefined");
//     return new URL("../assets/img/no-product-found.png", import.meta.url).href;
//   }
//   return new URL(`../assets/img/${name}`, import.meta.url).href;
// }
// export {getImgUrl}