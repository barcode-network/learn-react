## Exercise 3

This exercise is to add authentication using localstorage and [react-router](https://reactrouter.com/web/guides/quick-start)

### To do

- [ ] Add login page route (`/login`) with login form that accepts user name and password. Use [react-hook-form](https://react-hook-form.com/)
- [ ] Redirect the user to the `/login` route if they are not logged-in
- [ ] Restrict the user from viewing the tasks if they are not logged-in (using [react-router](https://reactrouter.com/web/guides/quick-start))
- [ ] Update userContext with logged in user information
- [ ] Store tasks with author information
- [ ] Display tasks with author information (any author can view all tasks)
- [ ] Display a 404 page if the user navigates to a route that does not exist

### Setup Instructions

- Fork the repo
- Setup Firebase project and copy config credentials
- Rename `.env.example` to `.env.local`
- Copy Firebase credentials to `.env.local`
- Install dependencies using `yarn`
- Run locally using `yarn start`

### Submission Instructions

- Fork the repo
- Commit changes to your repo using `git add .` and `git commit -m [commit message]`
- Submit PR to the branch
