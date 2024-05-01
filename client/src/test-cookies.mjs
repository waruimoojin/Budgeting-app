// test-cookies.mjs
import Cookies from "js-cookie";

// Fonction pour définir un cookie
const setCookie = () => {
  Cookies.set("testCookie", "Hello, this is a test cookie!", {
    domain: "localhost",
  });
  console.log("Cookie défini avec succès!");
};

// Fonction pour récupérer la valeur d'un cookie
const getCookieValue = () => {
  const cookieValue = Cookies.get("testCookie");
  console.log("Valeur du cookie :", cookieValue);
};

// Fonction pour supprimer un cookie
const deleteCookie = () => {
  Cookies.remove("testCookie");
  console.log("Cookie supprimé avec succès!");
};

// Appeler les fonctions de test
setCookie();
getCookieValue();
deleteCookie();
