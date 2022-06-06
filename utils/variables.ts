import { Dimensions } from 'react-native';

export const passwordRules =
    'minlength: 20; maxlength: 12; required: lower; required: upper; required: digit;';

// Carousel
export const SLIDER_WIDTH = Dimensions.get('window').width;

// Sort options
export const sortOptions = [
    { label: 'Produktnavn A-Å', value: 'A-AA' },
    { label: 'Produktnavn Å-A', value: 'AA-A' },
    { label: 'Laveste pris', value: 'lowest' },
    { label: 'Højeste pris', value: 'highest' },
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
    { label: 'andre', value: 'other' },
    { label: 'brød', value: 'bread' },
    { label: 'mejeri', value: 'dairy' },
    { label: 'kage', value: 'dessert' },
    { label: 'kød', value: 'meat' },
    { label: 'kolonial', value: 'colonial' },
    { label: 'drikkevarer', value: 'drinks' },
    { label: 'plantebaseret', value: 'plantbased' },
    { label: 'frugt & grønt', value: 'fruitsAndVeggies' },
    { label: 'bread', value: 'fishAndSeafood' },
];
