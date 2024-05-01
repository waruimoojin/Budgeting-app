const app = require("./app");
const connectDB = require("./db");

const init = function () {
  console.log("YESSSSSSSSSSSS");

  app.listen(3000, async () => {
    await connectDB();
    console.log("Server running on port ", 3000);
  });
};

init();
