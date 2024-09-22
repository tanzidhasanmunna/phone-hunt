const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};
const displayPhones = (phones, isShowAll) => {
    // display  show all buttons if there are more than 12 phones

    if (phones.length > 12 && !isShowAll) {;
        document.getElementById("show-all-container").classList.remove('hidden');
        
    } else {
        document.getElementById("show-all-container").classList.add('hidden');
    }
    console.log(isShowAll)

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ""; // Clear previous content
    phones.forEach((phone) => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = "card bg-base-100 w-92 shadow-xl"
        phoneCard.innerHTML = `
                                <figure>
                        <img
                            src="${phone.image}"
                            alt="Shoes" />
                        </figure>
                        <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handelShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                        </div>
            `;
            
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
};

const handelShowDetail = async(id) => {
    // Show phone details here
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}
const showPhoneDetails =  (phone) => {
    const phoneName=  document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML= `
    <img src="${phone.image}" alt="${phone.name}" />
    <p><span>Storage:${phone.mainFeatures.storage}</span></P> 
    <p><span>GPS: ${phone?.others?.GPS || "NO GPS"}</span></P>  
    `
    show_details_modal.showModal()

}
function handelSearch(isShowAll){
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById("loading-spinner");
    if(isLoading){
        spinner.classList.remove("hidden");
    }
    else{
        spinner.classList.add("hidden");
    }
    
}

const handleShowAll = ( ) => {
    handelSearch(true);
}
