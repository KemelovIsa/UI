import { FC, useState, useEffect } from "react";
import axios from "axios";
import scss from "./Cards.module.scss";

interface CardData {
  id: number;
  title: string;
  date: string;
  text: string;
  img: string;
}

const Cards: FC = () => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<CardData[]>(
          "https://api.elchocrud.pro/api/v1/5db32def9b8406400a6a84906352b3aa/LMS-Cards"
        );
        setCardsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    return () => {
      setCardsData([]);
    };
  }, []);

  return (
    <div className={scss.Card}>
      {cardsData.map((card) => (
        <div key={card.id} className={scss.firstBlockContainer}>
          <div>
            <img className={scss.BlockImage} src={card.img} alt={card.title} />
          </div>
          <div className={scss.zeroBlockContainer}>
          <div className={scss.secondBlockContainer}>
            <p className={scss.BlockTitle}>{card.title}</p>
            <p className={scss.BlockDate}>{card.date}</p>
          </div>
          <p className={scss.BlockText}>{card.text}</p>
        </div>
          </div>
      ))}
    </div>
  );
};

export default Cards;
