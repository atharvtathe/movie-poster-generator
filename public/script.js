async function movieget(inputvalue) {
    const movie = await fetch(`/poster?title=${inputvalue}`);
    const hello = await movie.json();
    return hello;
}

const submitbutton = document.getElementById('submit');

submitbutton.addEventListener('click',(e) => {
    const inputtype = document.getElementById('title');
    const inputvalue = inputtype.value;

    try{
        movieget(inputvalue).then(data => {

            if(data.Response === 'False' || data.Poster === 'N/A')
            {
                const mytitle = document.querySelector('.titleof');
                mytitle.textContent = `${inputvalue} Not Found!`;
                const img = document.getElementById('image');
                img.setAttribute('src', '');
            }
            else 
            {
                const posterurl = data.Poster;
                const title = data.Title;
                const mytitle = document.querySelector('.titleof');
                mytitle.textContent = title;
                const img = document.getElementById('image');
                img.setAttribute('src', posterurl);
            }  
        })
    }
    catch(err) {
        console.log(err);
    };
    
    inputtype.value = '';
    e.preventDefault();
})
//made by atharv tathe

