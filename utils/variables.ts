import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

export const passwordRules =
    'minlength: 20; maxlength: 12; required: lower; required: upper; required: digit;';

// Carousel
export const SLIDER_WIDTH = Dimensions.get('window').width;

// Sort options
export const sortOptions = [
    {
        label: { dk: 'Produktnavn A-Å', en: 'Product name A-AA' },
        value: 'A-AA',
    },
    {
        label: { dk: 'Produktnavn Å-A', en: 'Product name AA-A' },
        value: 'AA-A',
    },
    {
        label: { dk: 'Laveste pris', en: 'Lowest price' },
        value: 'lowest',
    },
    {
        label: { dk: 'Højeste pris', en: 'Highest price' },
        value: 'highest',
    },
];

// Unit options
export const unitOptions = [
    { label: 'mg', value: 'mg' },
    { label: 'g', value: 'g' },
    { label: 'kg', value: 'kg' },
    { label: 'ml', value: 'ml' },
    { label: 'cl', value: 'cl' },
    { label: 'dl', value: 'dl' },
    { label: 'l', value: 'l' },
];

// Category dropdown
export const categoriesOptions = [
    // {
    //     label: { dk: 'andre', en: 'other' },
    //     value: 'other',
    // },
    {
        label: { dk: 'brød', en: 'bread' },
        value: 'bread',
    },
    {
        label: { dk: 'mejeri', en: 'dairy' },
        value: 'dairy',
    },
    {
        label: { dk: 'kage', en: 'dessert' },
        value: 'dessert',
    },
    {
        label: { dk: 'kød', en: 'meat' },
        value: 'meat',
    },
    {
        label: { dk: 'kolonial', en: 'colonial' },
        value: 'colonial',
    },
    {
        label: { dk: 'drikkevarer', en: 'drinks' },
        value: 'drinks',
    },
    {
        label: { dk: 'plantebaseret', en: 'plantbased' },
        value: 'plantbased',
    },
    {
        label: { dk: 'Frugt & Grøntsager', en: 'fruits & Veggies' },
        value: 'fruitsAndVeggies',
    },
    {
        label: { dk: 'Fisk & Skaldyr', en: 'fish & Seafood' },
        value: 'fishAndSeafood',
    },
];
