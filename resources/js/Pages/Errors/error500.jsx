// export default function ErrorPage({ status }) {
//     const title = {
//       503: '503: Service Unavailable',
//       500: '500: Server Error',
//       404: '404: Page Not Found',
//       403: '403: Forbidden',
//     }[status]
  
//     const description = {
//       503: 'Sorry, we are doing some maintenance. Please check back soon.',
//       500: 'Whoops, something went wrong on our servers.',
//       404: 'Sorry, the page you are looking for could not be found.',
//       403: 'Sorry, you are forbidden from accessing this page.',
//     }[status]
  
//     return (
//       <div>
//         <H1>{title}</H1>
//         <div>{description}</div>
//       </div>
//     )
//   }

import React from "react";

export default function error500() {
  
    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-[87px]">
                <div className="flex flex-col gap-6">
                    <div className="text-neutral-950 font-sf-pro font-bold text-[48px]">System under maintenance</div>
                    <div className="flex flex-col text-neutral-950 text-base font-sf-pro">
                        <span>Our developers are working hard to elevate your experience with e-inbill.</span>
                        <span>Please check back soon.</span>
                    </div>
                </div>
                <div>
                    <img src="/assets/500.svg" alt="" />
                </div>
            </div>
        </div>
    )
}