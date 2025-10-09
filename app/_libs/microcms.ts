export type Category = {
    name: string;
};

export type News = {
    id: number;
    title: string;
    category: {
        name: string;
    };
    publishedAt: string;
    createdAt: string;
};