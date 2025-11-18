import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51S6h9zIZxvFePJ3icTvxCEyUFdpxZ7EGbJHTtsFP7JCyln6bpOKmyWmRLOpZVXiia7ESf5K11UTCAgvQcj1OYWF700FyPWkhXw"
);

export default stripePromise;
