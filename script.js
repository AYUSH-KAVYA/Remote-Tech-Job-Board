
let jobcon=document.getElementById('job-container')
let loader=document.getElementById('loader')
let searchInput=document.getElementById('search')
let none=document.getElementById('nonedisplay')
let catfilter=document.getElementById('categoryfilter')
let sortFilter=document.getElementById('sort-filter')
let theme=document.getElementById('theme-toggle')
let favToggle=document.getElementById('favorites-toggle')
let favCount=document.getElementById('fav-count')
let resultsInfo=document.getElementById('results-info')
let resultsCount= document.getElementById('results-count')
let backToTop =document.getElementById('back-to-top')
let loadMoreContainer= document.getElementById('load-more-container')
let scrollLoader= document.getElementById('scroll-loader')
let loadmore= document.getElementById('load-more-btn')
let allJobs=[]
let filteredJobs=[]
let favorites=[]
let PAGE_SIZE=250
let currpage=1

function debounce(func, delay) {
    let throttletimeid
    return function (...args) {
        clearTimeout(throttletimeid)
        throttletimeid=setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

//throttle fn
function throttle(func, limit) {
    let lastRun = 0
    let throttletimeid = null
    return function (...args) {
        let now=Date.now()
        let remain=limit-(now-lastRun)
        clearTimeout(throttletimeid)
        if(remain<=0) {
            lastRun=now
            func.apply(this,args)
        }else{
            throttletimeid = setTimeout(()=>{lastRun=Date.now()
                func.apply(this, args)
            },remain)
        }
    }
}

//fav sectin 
function loadFavorites() {
    try{
        let stored =localStorage.getItem('rtjb_favorites')
        favorites = stored ? JSON.parse(stored) : []
    } catch (e) {
        favorites = []
    }
    upfavCount()
}

function savefav() {
    localStorage.setItem('rtjb_favorites', JSON.stringify(favorites))
    upfavCount()
}

let showingFavorites = false
function togglefav(jobId) {
    let index = favorites.indexOf(jobId)
    if (index === -1) {
        favorites.push(jobId)
    } else {
        favorites.splice(index, 1)
    }
    savefav()
}
function isFavorite(jobId) {
    return favorites.indexOf(jobId) !== -1
}
function upfavCount() {
    if (favorites.length > 0) {
        favCount.textContent = favorites.length
        favCount.classList.remove('hidden')
    } else {
        favCount.classList.add('hidden')
    }
}
favToggle.addEventListener('click', () => {
    showingFavorites = !showingFavorites
    favToggle.classList.toggle('active')
    rfilter()
})


//light darkmode
function loadtheme() {
    let savedTheme = localStorage.getItem('rtjb_theme')
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode')
        theme.textContent = '☀️'
    } else {
        document.body.classList.remove('dark-mode')
        theme.textContent = '🌙'
    }
}

function savetheme() {
    let isDark = document.body.classList.contains('dark-mode')
    localStorage.setItem('rtjb_theme', isDark ? 'dark' : 'light')
}



//                       fetch logic
let apiurl="https://remotive.com/api/remote-jobs?limit=250"
async function fetchjobs() {
    try {
        loader.classList.remove('hidden')
        jobcon.classList.add('hidden')
        resultsInfo.classList.add('hidden')
        loadMoreContainer.classList.add('hidden')
        let res=await fetch(apiurl)
        let d=await res.json()
        allJobs = d.jobs
        loader.classList.add('hidden')
        jobcon.classList.remove('hidden')
        currpage = 1
        rfilter()
    } catch (error) {
        loader.innerHTML = '<div class="zero-icon"></div><p>Failed to load jobs. Please try again later.</p>'
    }
}





//           filter and sorting
function rfilter() {
    let selectjob=[...allJobs]
    let searchTerm=searchInput.value.toLowerCase()
    if (searchTerm!=='') {
        selectjob=selectjob.filter((job) => {
            let titlem =job.title.toLowerCase().includes(searchTerm)
            let companyMatch =job.company_name.toLowerCase().includes(searchTerm)
            return titlem || companyMatch
        })}
    let selectcate = catfilter.value
    if (selectcate !== 'all') {
        selectjob = selectjob.filter((job) => {
            return job.category === selectcate
        })
    }
    let sortMethod = sortFilter.value
    selectjob.sort((a, b) => {
        let datea =new Date(a.publication_date)
        let dateb = new Date(b.publication_date)
        if (sortMethod === 'newest') {
            return dateb - datea
        } else {
            return datea - dateb
        }
    })
    
    if (showingFavorites) {
        selectjob = selectjob.filter((job) => {
            return isFavorite(job.id)
        })
    }
    
    filteredJobs = selectjob
    currpage = 1
    
    displayjobs(filteredJobs.slice(0, PAGE_SIZE))
    
    updateresinfo(filteredJobs.length)
    updateloadmore()
}


//result
function updateresinfo(total) {
    if (total > 0) {
        let showing = Math.min(currpage * PAGE_SIZE, total)
        resultsCount.textContent = 'Showing ' + showing + ' of ' + total + ' jobs' + (showingFavorites ? ' (Favorites)' : '')
        resultsInfo.classList.remove('hidden')
    } else {
        resultsInfo.classList.add('hidden')
    }
}






//display
function displayjobs(jobs) {
    jobcon.innerHTML = ''

    if (jobs.length === 0) {
        none.classList.remove('hidden')
        jobcon.classList.add('hidden')
        loadMoreContainer.classList.add('hidden')
        return
    } else {
        none.classList.add('hidden')
        jobcon.classList.remove('hidden')
    }

    jobs.forEach((job, index) => {
        let jobcard = document.createElement('div')
        jobcard.classList.add('job-card')
        jobcard.style.animationDelay = (index % PAGE_SIZE) * 0.04 + 's'

        let header = document.createElement('div')
        header.classList.add('job-card-header')

        let title = document.createElement('h4')
        title.textContent = job.title

        let favBtn = document.createElement('button')
        favBtn.classList.add('btn-fav')
        favBtn.title = 'Toggle Favorite'
        favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
        if (isFavorite(job.id)) {
            favBtn.classList.add('is-fav')
        }
        favBtn.addEventListener('click', () => {
            togglefav(job.id)
            favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
            favBtn.classList.toggle('is-fav')
            if (showingFavorites) {
                rfilter()
            }
        })
        header.appendChild(title)
        header.appendChild(favBtn)

        let company = document.createElement('p')
        company.classList.add('company')
        company.textContent = job.company_name

        let date = document.createElement('p')
        date.classList.add('date')
        let pubDate = new Date(job.publication_date)
        date.textContent = pubDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })

        let category = document.createElement('span')
        category.classList.add('category')
        category.textContent = job.category

        let viewbtn = document.createElement('a')
        viewbtn.href = job.url
        viewbtn.target = '_blank'
        viewbtn.rel = 'noopener noreferrer'
        viewbtn.classList.add('view')
        viewbtn.textContent = 'View Job →'

        jobcard.appendChild(header)
        jobcard.appendChild(company)
        jobcard.appendChild(date)
        jobcard.appendChild(category)
        jobcard.appendChild(viewbtn)
        jobcon.appendChild(jobcard)
    })
}
function displayjobs(jobs) {
    jobcon.innerHTML = ''

    if (jobs.length === 0) {
        none.classList.remove('hidden')
        jobcon.classList.add('hidden')
        loadMoreContainer.classList.add('hidden')
        return
    } else {
        none.classList.add('hidden')
        jobcon.classList.remove('hidden')
    }

    jobs.forEach((job, index) => {
        let jobcard = document.createElement('div')
        jobcard.classList.add('job-card')
        jobcard.style.animationDelay = (index % PAGE_SIZE) * 0.04 + 's'

        let header = document.createElement('div')
        header.classList.add('job-card-header')

        let title = document.createElement('h4')
        title.textContent = job.title

        let favBtn = document.createElement('button')
        favBtn.classList.add('btn-fav')
        favBtn.title = 'Toggle Favorite'
        favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
        if (isFavorite(job.id)) {
            favBtn.classList.add('is-fav')
        }
        favBtn.addEventListener('click', () => {
            togglefav(job.id)
            favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
            favBtn.classList.toggle('is-fav')
            if (showingFavorites) {
                rfilter()
            }
        })

        header.appendChild(title)
        header.appendChild(favBtn)

        let company = document.createElement('p')
        company.classList.add('company')
        company.textContent = job.company_name

        let date = document.createElement('p')
        date.classList.add('date')
        let pubDate = new Date(job.publication_date)
        date.textContent = pubDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })

        let category = document.createElement('span')
        category.classList.add('category')
        category.textContent = job.category
        let viewbtn = document.createElement('a')
        viewbtn.href = job.url
        viewbtn.target = '_blank'
        viewbtn.rel = 'noopener noreferrer'
        viewbtn.classList.add('view')
        viewbtn.textContent = 'View Job →'
        jobcard.appendChild(header)
        jobcard.appendChild(company)
        jobcard.appendChild(date)
        jobcard.appendChild(category)
        jobcard.appendChild(viewbtn)
        jobcon.appendChild(jobcard)
    })
}


// ADD MORE JOBS
function appendJobs(jobs) {
    jobs.forEach((job, index) => {
        let jobcard = document.createElement('div')
        jobcard.classList.add('job-card')
        jobcard.style.animationDelay = index * 0.04 + 's'
        let header = document.createElement('div')
        header.classList.add('job-card-header')
        let title = document.createElement('h4')
        title.textContent = job.title
        let favBtn = document.createElement('button')
        favBtn.classList.add('btn-fav')
        favBtn.title = 'Toggle Favorite'
        favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
        if(isFavorite(job.id)) {
            favBtn.classList.add('is-fav')}
        favBtn.addEventListener('click', () => {togglefav(job.id)
            favBtn.textContent = isFavorite(job.id) ? '❤️' : '🤍'
            favBtn.classList.toggle('is-fav')
            if (showingFavorites) {
                rfilter()
            }
        })
        header.appendChild(title)
        header.appendChild(favBtn)
        let company=document.createElement('p')
        company.classList.add('company')
        company.textContent = job.company_name
        let date = document.createElement('p')
        date.classList.add('date')
        let pubDate = new Date(job.publication_date)
        date.textContent = pubDate.toLocaleDateString('en-US', {month: 'short',day: 'numeric',year: 'numeric'})
        let category = document.createElement('span')
        category.classList.add('category')
        category.textContent = job.category
        let viewbtn = document.createElement('a')
        viewbtn.href = job.url
        viewbtn.target = '_blank'
        viewbtn.rel = 'noopener noreferrer'
        viewbtn.classList.add('view')
        viewbtn.textContent = 'View Job →'
        jobcard.appendChild(header)
        jobcard.appendChild(company)
        jobcard.appendChild(date)
        jobcard.appendChild(category)
        jobcard.appendChild(viewbtn)
        jobcon.appendChild(jobcard)
    })
}

//MORE SCROLL
function updateloadmore() {
    let totalshown=currpage*PAGE_SIZE
    if (totalshown<filteredJobs.length) {
        loadMoreContainer.classList.remove('hidden')
        loadmore.classList.remove('hidden')
        scrollLoader.classList.add('hidden')
    } else {
        loadMoreContainer.classList.add('hidden')
        loadmore.classList.add('hidden')
    }
}

function loadNextPage() {
    if (isLoadingMore) return
    let totalshown=currpage * PAGE_SIZE
    if (totalshown> filteredJobs.length) return

    isLoadingMore = true
    scrollLoader.classList.remove('hidden')
    loadmore.classList.add('hidden')

    setTimeout(() => {
        currpage++
        let start = (currpage - 1) * PAGE_SIZE
        let end = currpage * PAGE_SIZE
        let nextBatch = filteredJobs.slice(start, end)

        appendJobs(nextBatch)
        updateresinfo(filteredJobs.length)
        updateloadmore()

        isLoadingMore = false
        scrollLoader.classList.add('hidden')
    }, 400)
}
let handleScroll = throttle(() => {
    let scrolltop = window.scrollY
    let windowHeight = window.innerHeight
    let docHeight = document.documentElement.scrollHeight

    if (scrolltop + windowHeight >= docHeight - 300) {
        loadNextPage()
    }

    if (scrolltop > 500) {
        backToTop.classList.remove('hidden')
    } else {
        backToTop.classList.add('hidden')
    }
}, 200)

window.addEventListener('scroll', handleScroll)

let debouncedFilter = debounce(() => {
    rfilter()
}, 300)

searchInput.addEventListener('input', debouncedFilter)
catfilter.addEventListener('change', rfilter)
sortFilter.addEventListener('change', rfilter)

loadmore.addEventListener('click', loadNextPage)






//THME WITH LOCAL STORAGE
theme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    if (document.body.classList.contains('dark-mode')) {
        theme.textContent = '☀️'
    } else {
        theme.textContent = '🌙'
    }
    savetheme()
})









//BACK TO TOPP
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})








//PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((reg) => {
                console.log('Service Worker registered:', reg.scope)
            })
            .catch((err) => {
                console.log('Service Worker registration failed:', err)
            })
    })
}
loadtheme()
loadFavorites()
fetchjobs()