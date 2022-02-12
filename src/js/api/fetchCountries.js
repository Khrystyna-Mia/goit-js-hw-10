const BASE_URL = `https://restcountries.com/v3.1/name`;

// export default fetchCountries;
    
export function fetchCountries(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        });
};
 
