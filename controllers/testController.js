const testServer = async (req, res, next) => {
  try {
    res.json({
      status: true,
      message: "Hello from test server",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "server error!",
    });
  }
};

export default testServer;
