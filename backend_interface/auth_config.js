const authConfig = {
    authority: "https://bouncer.canapads.ca",
    client_id: "MakakoWeb",
    redirect_uri: "https://www.canapads.ca/auth",
    response_type: "code",
    scope: "openid profile",
    post_logout_redirect_uri: "https://www.canapads.ca/logout",
    automaticSilentRenew: false,
    DefaultStaleStateAge: 5
};

export default authConfig;