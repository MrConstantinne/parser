import { load } from 'cheerio';
import axios from 'axios';

const URL = 'https://proglib.io/';
const PARSING_CONTAINER = '.preview-card__content'
const TEXT_FOUND_ELEMENT_ONE = '.preview-card__title'
const TEXT_FOUND_ELEMENT_TWO = '.preview-card__text'

const AxiosInstance = axios.create();

interface Data {
    title: string,
    preview: string
}

AxiosInstance.get(URL)
    .then(
        response => {
            const html = response.data;
            const $ = load(html);
            const statsTable: Cheerio = $(PARSING_CONTAINER);
            const data: Data[] = [];

            statsTable.each((i, elem) => {
                const title: string = $(elem).find(TEXT_FOUND_ELEMENT_ONE).text();
                const preview: string = $(elem).find(TEXT_FOUND_ELEMENT_TWO).text();
                data.push({ title, preview });
            });

            console.log(data);
        }
    )
    .catch(console.error);

