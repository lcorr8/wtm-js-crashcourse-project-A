# Review tasks week 5

1. :white_check_mark: you don’t need to use `Object.freeze` for your enums — not only there are certain ways to hack it, it’s generally unnecessary. you will do code reviews all the time anyway, no one should modify this.

2. :white_check_mark: prefer singular for enum  names, `ApplicationStatus` instead of `ApplicationStatuses`. prefer `UPPER_CASE` instead of `PascalCase`, should be `INTERVIEW_OFFERED` instead of `InterviewOffered`.

3. TODO: add and expose your enums in your respective models. when your code gets big, you can’t add all of your enums to a single file.

4. :white_check_mark: you don’t need `Object.assign` in const `interviewParams = Object.assign(scheduleOptions,{job: application.job, application: application,jobSeeker: application.jobSeeker})`. the following also works:
`const interviewParams = {...scheduleOptions, job: application.job, application: application,jobSeeker: application.jobSeeker}`

5. :white_check_mark: in your index.js, while defining your routes, you should use root url’s — instead of app.use(EmployerRoutes);, write `app.use('/employer', EmployerRoutes);` so that you don’t have to repeat /employer in all your routes in routes/employer.js

6. :white_check_mark: the complex endpoints should also be in your routes file.

7. :white_check_mark: `.post('/employer/:id` shouldn’t create a job listing — the url, in  the worst case, should look like `.post('/employer/:id/jobs`, however you already have a router for jobs — and you already have a `.post('/job'` there — i think the first one is redundant.

8. :white_check_mark: in index.js, on line 67, you’re sending back the query for /jobs?, instead it should be `res.send(jobs)`, or the commented out line next,  `res.render('jobs', { jobs })`

9. :white_check_mark: again, this handler should be under `routes/job.js`

10. :white_check_mark: use kebab-case in the url, localhost:3000/jobseeker should b e `localhost:3000/job-seeker`

11. :white_check_mark: you’re getting a Maximum call stack size exceeded while trying to create a job or apply to it - yeah validation error that I wasn't logging...oops!

12. TODO: use regular try / catch blocks for awaiting async calls, instead of .catch() function which is for promises

13. :white_check_mark: i’m not sure why you’re getting a max call stack size exceeded, but a way to fix it is to replace the line jobseeker.applications.push(application); with jobseeker.applications.push(application._id); in services/application-service.js — basically, instead of pushing the entire application, just push the id. works the same.

14. TODO: for submitting applications in `app.post('/application/:applicationId/submit'`, I see that you’re finding the job via its _id, this should be unnecessary if you autopopulate the job field in applications. 
    - :white_check_mark: also, `ApplicationService.submitApplication` should return the updated application, so that you don’t need line 97 where you find the same application again.

15. :white_check_mark: the following is a raw query: `await ApplicationService.updateOne(id, { status })` — routes shouldn’t use raw queries, encapsulate this functionality in the service or the model itself. you could use something like `ApplicationService.setApplicationStatus(application, status)` or  `application.setStatus(statusName)` 

16. :white_check_mark: instead of using `InterviewService.addToApplication` you could prefer `ApplicationService.addInterview` or better yet application.addInterview

sample try/catch block:

```// CREATE EVENT

router.post('/', async (req, res) => {
    try {
        const newEvent = await EventService.add(req.body)
        res.res.render(user);
    } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
});
```


:white_check_mark: