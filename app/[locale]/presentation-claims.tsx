import Image from "next/image";
import { Claim } from "@/app/lib/definitions";

export default function PresentationClaims({ claims }: { claims: Claim[] }) {
  return claims.map((item) => {
    return (
      <div key={item.key} className="flex py-1">
        <span className="font-semibold text-base mr-1">{item.key}:</span>
        {item.type === "image" ? (
          <Image
            className="w-1/3 h-1/3 object-cover"
            src={item.value}
            alt="Card Image"
            width={20}
            height={20}
          />
        ) : (
          <span className="font-light text-base">{item.value}</span>
        )}
      </div>
    );
  });
}
