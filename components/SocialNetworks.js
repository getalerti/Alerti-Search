import { sanitizeUrl } from "../helpers/functions"
import Spinner from "./Spinner"

export default ({ socialNetworks }) => {
    if (!socialNetworks) return <Spinner />
    const { facebookUri, instagramUri, twitterUri, linkedinUri, githubUri } = socialNetworks
    return (
        <div className="social-networks">
            { facebookUri && <a href={sanitizeUrl(facebookUri)} target='_blank'><i class="fab fa-facebook"></i></a> }
            { instagramUri && <a href={sanitizeUrl(instagramUri)} target='_blank'><i class="fab fa-instagram"></i></a> }
            { twitterUri && <a href={sanitizeUrl(twitterUri)} target='_blank'><i class="fab fa-twitter"></i></a> }
            { linkedinUri && <a href={sanitizeUrl(linkedinUri)} target='_blank'><i class="fab fa-linkedin"></i></a> }
            { githubUri && <a href={sanitizeUrl(githubUri)} target='_blank'><i class="fab fa-github"></i></a> }
        </div>
    )
}