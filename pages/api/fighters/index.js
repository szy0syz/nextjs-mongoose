import createHandler from "../../../middlewares";
import Fighter from "../../../models/fighter";

const handler = createHandler();

handler.get(async (_, res) => {
  const fighters = await Fighter.find({}).exec();

  res.status(200).json(fighters);
});

export default handler;
