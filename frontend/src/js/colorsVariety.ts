const bgvariants = ["bg-green-900", "bg-yellow-900", "bg-red-900", "bg-blue-900", "bg-purple-900", "bg-indigo-900", "bg-gray-900", "bg-orange-900"];
const bordervariants = ["border-green-700", "border-yellow-700", "border-red-700", "border-blue-700", "border-purple-700", "border-indigo-700", "border-gray-700", "border-orange-700"];
let instanceCounter = 0;

export const getColors = () => {
    const bg = bgvariants[instanceCounter];
    const border = bordervariants[instanceCounter];
    instanceCounter = (instanceCounter + 1) % bgvariants.length;
    return { bg, border };
}
