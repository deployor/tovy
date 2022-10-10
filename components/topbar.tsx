import type { NextPage } from "next";
import { loginState } from "@/state";
import { useRecoilState } from "recoil";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { IconLogout, IconSettings } from "@tabler/icons";
import axios from "axios";

const Topbar: NextPage = () => {
	const [login, setLogin] = useRecoilState(loginState); 
	const router = useRouter();
	async function logout() {
		await axios.post("/api/auth/logout");
		setLogin({
			userId: 1,
			username: '',
			displayname: '',
			thumbnail: '',
			workspaces: []
		});
		router.push('/login');
	}
	return (
		<div className="z-10 h-12 w-screen bg-white drop-shadow flex-row flex lg:px-48 md:px-32 sm:px-20 xs:px-9 px-8 dark:bg-gray-900 ">
			<div className="h-full flex flex-row w-full">
				<img src="/Icon_Transparent.svg" className="block h-full w-12" />
				<p className="my-auto text-lg font-semibold pl-2"> Tovy </p>
				<div className="flex flex-row my-auto ml-auto">
					<Menu as="div" className="relative inline-block text-left">
						<div className="">
							<Menu.Button className="h-auto flex flex-row ml-auto rounded-sm py-1 hover:bg-gray-200 dark:hover:bg-gray-800 px-2 transition cursor-pointer">
								<img
									src={login?.thumbnail}
									className="rounded-full bg-gray-400 h-8 w-8 my-auto"
								/>
								<p className="my-auto text-md font-medium pl-2">
									{login?.displayname}
								</p>
							</Menu.Button>
						</div>
						<Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus-visible:outline-none">
							<div className="py-1">
								<Menu.Item>
									<a className="flex flex-row px-4 py-2 text-sm">
										<img
											src={login?.thumbnail}
											className="rounded-full bg-gray-400 h-8 w-8 my-auto"
										/>
										<div className="ml-2"> Signed in as <br />
											<span className="font-medium"> ItsWHOOOP </span> </div>
									</a>
								</Menu.Item>
								<div className="w-full h-px bg-gray-200 dark:bg-gray-600"></div>
								<Menu.Item>
									{({ active }) => (
										<a
											className={`${active ? "bg-tovybg text-white" : "text-gray-700 dark:text-white"
												}  px-3 py-2 text-sm rounded-md m-1 mb-0 font-medium flex flex-row cursor-pointer`}
										>
											<IconSettings size={22} className="inline-block" />
											<p className="ml-2"> Account settings </p>
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											className={`${active ? "bg-tovybg text-white" : "text-gray-700 dark:text-white"
												}  px-3 py-2 text-sm rounded-md m-1 mb-0 font-medium flex flex-row cursor-pointer`}
											onClick={logout}
										>
											<IconLogout size={22} className="inline-block" />
											<p className="ml-2"> Logout </p>
										</a>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
