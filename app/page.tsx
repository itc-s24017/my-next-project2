import Image from "next/image";
import styles from "./page.module.css";
import NewsList from "@/app/_components/NewsList";
import { News } from "@/app/_libs/microcms";
import ButtonLink from "@/app/_components/ButtonLink";

const data: {
  constets: News[] } = {
  constets: [
    {
      id: 1,
      title: "渋谷にオフィス移転しました",
      category: {
        name: "情報更新",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: 2,
      title: "当社CEOが業界リーダーTOP30に選出されました",
      category: {
        name: "情報更新",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: 3,
      title: "テストの記事です",
      category: {
        name: "情報更新",
      },
      publishedAt: "2023/04/19",
      createdAt: "2023/04/19",
    },
  ],
};

export default function Home() {
  //const sliceData = data.constets.slice(0,2);
  const sliceData: News[] = [];
  return (
    <>
          <section className={styles.top}>
    <div>
        <h1 className={styles.title}>テクノロジーの力で世界を変えでる</h1>
        <p className={styles.description}>
          私たちは市場をリードしているグローバルカンパニーです。
        </p>
    </div>
    <Image
          className={styles.bgimg}
          src="/img-mv.jpg"
          alt=""
          width={4000}
          height={1200}
        />
  </section>
  <section className={styles.news}>
    <h2 className={styles.sectionTitle}>News</h2>
    <NewsList news={sliceData} />
      <div className={styles.newsLink}>
        <ButtonLink href="/news">もっとみる</ButtonLink>
      </div>
    </section>
  </>
  );
}
