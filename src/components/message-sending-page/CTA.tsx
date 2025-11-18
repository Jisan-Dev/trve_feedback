import Link from "next/link";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <div className="text-center">
      <div className="mb-4">Get Your Message Board</div>
      <Link href={"/sign-up"}>
        <Button>Create Your Account</Button>
      </Link>
    </div>
  );
};

export default CTA;
