export const responseFilter = (response: Response) => {
	if (!response.ok){
   		if (response.status === 401) {
      		document.location.href = "/login";
    	}
    	throw new Error(response.statusText);
  	}
  	return response.json();
}


export const login =　(
	username: string,
	password: string,
	setErrorMsg?: (message: string) => void 
) => {
	fetch(`api/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({username, password})
	})
	.then(response => {
		if (!response.ok) {
			if (setErrorMsg) {
				setErrorMsg("Login failed.");
			}
			throw new Error(response.statusText);
		}
		document.location.href = "/";
	})
	.catch(console.error);
}


export const logout = () => {
	fetch(`api/logout`)
}


export const signup = (
	username: string,
	password: string,
	passwordConfirm: string,
	setErrorMsg?: (message: string) => void 
) => {
	if (password !== passwordConfirm && setErrorMsg) {
		setErrorMsg("Confirmation passwords do not match.");
	} else {
		fetch(`api/signup`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({username, password})
		})
		.then(response => {
			if (!response.ok) {
				if (setErrorMsg) {
					setErrorMsg((response.status === 409)? 
						"That Username is already in use." 
						: "Signup failed.");
				}
				throw new Error(response.statusText);
			}
			document.location.href = "/login";
		}).catch(console.error);
	}
}


export const getProfile = () => {
	return fetch(`api/profile`)
	.then(responseFilter)
	.catch(console.error);
}
