import Image from "next/image";
import { Claim } from "@/app/lib/definitions";

export default function PresentationClaims({ claims }: { claims: Claim[] }) {
  return (
    <div className="md:w-full xl:w-2/5 flex flex-col overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700">
        <tbody>
          {claims.map((item, index) => (
            <tr
              key={item.key}
              className={
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-slate-900"
                  : "bg-white dark:bg-gray-950"
              }
            >
              <td className="py-2 px-4 border-b border-r border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <span className="text-base">{item.key}</span>
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                {item.type === "image" ? (
                  <Image
                    className="w-1/3 h-1/3 object-cover"
                    src={item.value}
                    alt="Card Image"
                    width={20}
                    height={20}
                  />
                ) : (
                  <span className="flex-1 break-all font-light text-base line-clamp-2 hover:line-clamp-none">
                    {item.value}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
