import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  console.log(session?.user);
  return <div>hello</div>;
};

export default page;
