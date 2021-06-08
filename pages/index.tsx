import { useState, useEffect } from "react";
import { dbConnect, jsonify } from "@/middlewares/db";
import Fighter from "@/models/fighter";

export default function Home({ fighters }: { fighters: any[] }) {
  const [asyncFighters, setAsyncFighters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/fighters")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setAsyncFighters(data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>nextjs-mongoose</h1>
      <br />
      <h2>我是同步数据</h2>
      {fighters.map((item: any) => (
        <h3 key={item.firstName}>
          {item.firstName} | {item.lastName}
        </h3>
      ))}
      <br />
      <hr />
      <br />
      <h2>我是异步数据</h2>
      {loading && <h4>异步加载中...</h4>}
      {asyncFighters.map((item: any) => (
        <h3 key={item.firstName}>
          {item.firstName} | {item.lastName}
        </h3>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  dbConnect();

  const fighters = await Fighter.find({});

  return {
    props: {
      fighters: jsonify(fighters),
    },
  };
}
