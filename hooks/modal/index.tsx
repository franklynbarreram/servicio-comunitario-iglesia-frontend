import { useCallback, useState, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export const useModal = () => {
	const [isShow, setIsShow] = useState(false);
	const cancelButtonRef = useRef<HTMLDivElement>(null);
	const hide = () => {
		setIsShow(false);
	};

	const show = () => {
		setIsShow(true);
	};

	const Modal = useCallback(({ children, isShow }) => {
		return (
			<Transition.Root show={isShow} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed z-20 inset-0 overflow-y-auto"
					initialFocus={cancelButtonRef}
					open={isShow}
					onClose={hide}
				>
					<div className="flex items-center justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0 bg-overlay">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-transparent-color-gray-800 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="bg-white inline-block align-bottom text-left rounded-20 shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:w-full sm:max-w-lg">
								<div className="pb-4 pt-5 px-4 bg-gray-0 sm:p-6 sm:pb-4">
									{children}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		);
	}, []);

	return { Modal, hide, isShow, show };
};
