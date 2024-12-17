

// step: 1

const loadAllPhones= async(status, searchText)=>{
    // console.log(searchText);
    document.getElementById('spinner').style.display='none';
    // normal fetch
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data))
// }
// async await fetch

const response= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
const data=await response.json();
// console.log(data.data) // .data mane data gola sorasori dekhar jonno
// displayAllPhone(data.data.slice(0,6));// সরাসরি ডাটা দেখার জন্য .ডাটা( এখানে ফাংশন কল করা হয়েছে)
console.log(data)
if(status){
    displayAllPhone(data.data);
}
else{
    displayAllPhone(data.data.slice(0,6));
}
}
// slice kore 6 ta data nilam


// step-3
const displayAllPhone=(phones) =>{
//  এই যায়গায় ইফ এলস টা করবো তাহলে বারবার ফেচ টা কল হবে না।

    const phoneContainer=document.getElementById('phones-container');
   phones.forEach((phone) => {
    const {brand, image, slug} =phone //destructuring
    // console.log(phone)
    const div=document.createElement('div');
    div.innerHTML= `
   <div class="card bg-base-100 w-96 shadow-xl mt-10">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    
    `
    phoneContainer.appendChild(div)
   });
   
   
};
// step-2
const handleShowAll=()=>{
    loadAllPhones(true)
}

// step-1: 
const handleSearch=() =>{
    document.getElementById('spinner').style.display='block';
    const searchText=document.getElementById('search-box').value;
   setTimeout(function(){
    loadAllPhones(false, searchText)
   }, 3000)
};

// step-4
const phoneDetails = async(slug) =>{
// console.log(slug)

const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
const data= await response.json();
console.log(data.data)
const {brand, image, name} =data.data;
const modalContainer=document.getElementById('modal-container');
modalContainer.innerHTML=`
 <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="py-4">${name}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
`
my_modal_1.showModal()
}

loadAllPhones(false, "iphone") //global call auto load hobe 


// homw work = samsung data search and show all only search ja dibo tar sob gola data dibe and ulta palta diye search dile no data found dibe: