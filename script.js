let apiurl="https://remotive.com/api/remote-jobs?limit=20"
let jobcon=document.getElementById('job-container')
let loader=document.getElementById('loader')

async function fetchjobs(){
    try{loader.classList.remove('hidden')
        jobcon.classList.add('hidden')
        let res=await fetch(apiurl)
        let d=await res.json()
        let jobsarr=d.jobs
        loader.classList.add('hidden')
        jobcon.classList.remove('hidden')
        displayjobs(jobsarr)}
    catch(error){
        console.log(error)}}

function displayjobs(jobs) {
    jobcon.innerHTML=''
    jobs.forEach((job)=>{
        let jobcard=document.createElement('div')
        jobcard.classList.add('job-card')
        jobcard.innerHTML=`<h4>${job.title}</h4>
            <p class="company">Company: ${job.company_name}</p>
            <p class="category">Category: ${job.category}</p>
            <a href="${job.url}" target="_blank" class="view">View Job</a>`
        jobcon.appendChild(jobcard)})}

fetchjobs()