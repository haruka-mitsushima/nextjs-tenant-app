import Head from 'next/head';
import { GetStaticProps, GetStaticPaths} from "next";

export async function GetStaticPaths() {
    return {
        paths: [],
        fallback: false
    }
}
