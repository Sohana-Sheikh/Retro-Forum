//fetch all posts
const fetchAllPosts = async () => {
      const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
      const data = await response.json();
      const allPost = data.posts
      return allPost;
    }

//fetch posts by category
const loadCategories = async (categoryName) => {
  const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`;
  const res = await fetch(url);
  const data = await res.json();
  const categories = data.posts;
  return categories;
};

//display posts
function displayPosts(categories){
  
  const postsContainer = document.getElementById("post-container");
  postsContainer.innerText = '';
  const makeRead = document.getElementById('make-read-p');

  if (categories.length === 0) {
    postsContainer.classList =`mx-auto text-[36px] text-[red] font-mulish space-y-6`;
    postsContainer.innerHTML = 'No posts found.';
    makeRead.classList.add ('hidden')
    loading(false)
    return;
  }
  makeRead.classList.remove ('hidden')
  categories.forEach((post) => {
    // console.log(post);
    // create a div por single cards

    const div = document.createElement("div");
    div.classList = `flex bg-[#797DFC1A] w-full rounded-3xl border border-[#797DFC] shadow lg:p-10 p-[14px] lg:gap-6 gap-4`;
    div.innerHTML = `
        <div class="relative">
                    <img class="w-[90px] h-[47px] lg:w-[72px] lg:h-[72px] rounded-2xl" src="${post.image}" alt="">
                    <div class="p-[7px] rounded-full ${post.isActive? "bg-[#10B981]":"bg-[#FF3434]" } absolute top-[-5px] right-[-5px]">
                    </div>
                    <img src="" alt="">
                </div>

                <div>
                    <div class="flex gap-5 lg:mb-3">
                        <p class="font-inter text-[12px] lg:text-sm font-medium text-[#12132DCC]"># ${post.category}</p>
                        <p class="font-inter text-[12px] lg:text-sm font-medium text-[#12132DCC]">Author : ${post.author.name}</p>
                    </div>
                    <div class="pb-5 lg:mb-2 border-b-2 border-dashed border-[#12132D40]">
                        <h2 class="lg:mb-4 font-mulish lg:text-xl text-lg font-bold text-[#12132D]">${post.title}</h2>
                        <p class="font-inter text-sm lg:text-[16px] text-[#12132D99]">${post.description}
                        </p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex pt-3 gap-[8px] lg:gap-6 text-[#12132D99] font-inter lg:text-[16px] text-[12px]">
                            <p class="space-x-1">
                                <span><i class="fa-regular fa-message"></i></span>
                                <span>${post.comment_count}</span>
                            </p>
                            <p class="space-x-1">
                                <span><i class="fa-regular fa-eye"></i></span>
                                <span>${post.view_count}</span>
                            </p>
                            <p class="space-x-1">
                                <span><i class="fa-regular fa-clock"></i></span>
                                <span>${post.posted_time} min</span>
                            </p>
                        </div>
                        <div onclick="postRead('${post.title.replace("'", "")}', ${post.view_count})" class="mail-btn p-2 flex justify-center items-center cursor-pointer bg-[#10B981] rounded-full">
                            <i class="fa-solid fa-envelope-open text-white text-[12px] lg:text-[16px]"></i>
                        </div>
                    </div>
                </div>
        `;
    postsContainer.appendChild(div);
  });
  
  loading(false)
}

//load all posts
async function loadAllPosts() {
  const allPosts = await fetchAllPosts();
  displayPosts(allPosts);
}

// search posts by category
async function searchByCategory() {
  loading(true)
  const categoryInput = document.getElementById('input-field');
  const category = categoryInput.value.trim();
  categoryInput.value = ''
  
  if (category === '') {
    alert('Please enter a category.');
    loading(false)
    return;
  }

  const categoryPosts = await loadCategories(category);

  setTimeout(function() {
    displayPosts(categoryPosts);
  }, 2000);
  
}


// loading
const loadingBtn = document.getElementById('loading')
const loading = (isLoading) =>{
   if(isLoading){
  loadingBtn.classList.remove('hidden')
   }
   else{
  loadingBtn.classList.add('hidden')
   }
}

// Mail button
const postReadContainer = document.getElementById("post-read-container");
const count = document.getElementById("count");
let counter = 0;
function postRead(title, viewCount) {
  // Counting posts
  counter += 1;
  count.textContent = counter;

  // append Child
  const div = document.createElement("div");
  div.classList = `flex justify-around items-center bg-white p-4 rounded-2xl mb-4`;
  div.innerHTML = `
                    <p class="w-[75%] font-mulish font-semibold text-[14px] lg:text-[16px] text-[#12132D]">${title}</p>
                    <p class="font-inter lg:space-x-1 text-[#12132D99]">
                    <span><i class="fa-regular fa-eye"></i></span>
                    <span>${viewCount}</span>
                    </p>
`
    postReadContainer.appendChild(div);
}


// Load Latest Post from API
const loadLatestPost = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
  const res = await fetch(url);
  const data = await res.json();
  const latestALlPost = data;

  const latestPostContainer = document.getElementById('latest-post-container');
  latestALlPost.forEach((post) => {
    const div = document.createElement('div');
    div.classList = `card lg:w-96 w-80 border border-[#12132D26] rounded-3xl p-6`
    div.innerHTML = `
    <div class="">
                    <img class="rounded-[20px]" src="${post.cover_image}" alt="Shoes" />
                </div>

                <div class="card-body p-0">
                    <p class="font-mulish text-[16px] text-[#12132D99] mt-6"><i class="fa-regular fa-calendar mr-2"></i> ${post.author?.posted_date ? post.author.posted_date : "No Publish Date"}</p>
                  <h2 class="card-title font-mulish text-lg font-extrabold text-[#12132D]">${post.title}</h2>
                  <p class="font-mulish text-[16px] text-[#12132D99]">${post.description}</p>
                  <div class="flex gap-5 mt-4">
                    <div>
                      <img class="w-12 h-12 rounded-full" src="${post.profile_image}" alt="">
                    </div>
                    <div>
                      <h2 class="text-base font-bold font-mulish text-[16px] text-[#12132D]">${post.author.name}</h2>
                      <h3 class="flex gap-2 items-center py-2">
                        <span class="font-mulish text-sm text-[#12132D99]">${post.author?.designation ? post.author.designation : "Unknown"}</span>
                        
                      </h3>
                    </div>
                  </div>
                </div>
    `

    latestPostContainer.appendChild(div);
  });
};
loadAllPosts()
loadLatestPost();