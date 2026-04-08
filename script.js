let apiurl="https://remotive.com/api/remote-jobs?limit=250"
let jobcon=document.getElementById('job-container')
let loader=document.getElementById('loader')
let searchInput=document.getElementById('search')
let none=document.getElementById('nonedisplay')
let catfilter=document.getElementById('categoryfilter')
let sortFilter=document.getElementById('sort-filter')
let theme=document.getElementById('theme-toggle')
let allJobs=[] 
async function fetchjobs() {
    try {
        loader.classList.remove('hidden')
        jobcon.classList.add('hidden')
        let res=await fetch(apiurl)
        let d=await res.json()
        allJobs=d.jobs
        loader.classList.add('hidden')
        jobcon.classList.remove('hidden')
        rfilter()
    } catch(error) {
        loader.innerHTML="<p>Failed to load jobs. Please try again later.</p>"
    }
}
function rfilter() {
    let selectjob=[...allJobs]
    let searchTerm=searchInput.value.toLowerCase()
    if (searchTerm!=='') {
        selectjob=selectjob.filter((job) => {
            let titlem=job.title.toLowerCase().includes(searchTerm)
            let companyMatch=job.company_name.toLowerCase().includes(searchTerm)
            return titlem||companyMatch 
        })
    }
    let selectcate=catfilter.value
    if (selectcate!== 'all') {
        selectjob=selectjob.filter((job) => {
            return job.category===selectcate
        })}
    let sortMethod=sortFilter.value
    selectjob.sort((a,b) => {
        let datea=new Date(a.publication_date)
        let dateb=new Date(b.publication_date)
        
        if(sortMethod==='newest') {
            return dateb-datea 
    }else{
        return datea-dateb
}})
    displayjobs(selectjob)
}
function displayjobs(jobs) {
    jobcon.innerHTML = ''
    if(jobs.length === 0) {
        none.classList.remove('hidden')
        jobcon.classList.add('hidden')
        return 
    }else{
        none.classList.add('hidden')
        jobcon.classList.remove('hidden')
    }
    jobs.forEach((job) => {
        let jobcard=document.createElement('div')
        jobcard.classList.add('job-card')
        let title =document.createElement('h4')
        title.textContent =job.title
        let company=document.createElement('p')
        company.classList.add('company')
        company.textContent =job.company_name
        let category= document.createElement('span')
        category.classList.add('category')
        category.textContent=job.category
        let viewbtn=document.createElement('a')
        viewbtn.href=job.url
        viewbtn.target="_blank"
        viewbtn.classList.add('view')
        viewbtn.textContent='View Job'
        jobcard.appendChild(title)
        jobcard.appendChild(company)
        jobcard.appendChild(category)
        jobcard.appendChild(viewbtn)
        jobcon.appendChild(jobcard)
    })
}
searchInput.addEventListener('input',rfilter)
catfilter.addEventListener('change',rfilter)
sortFilter.addEventListener('change',rfilter)
theme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    if (document.body.classList.contains('dark-mode')) {
        theme.textContent = '☀️'
    } else {
        theme.textContent='🌙'
    }
})
fetchjobs()