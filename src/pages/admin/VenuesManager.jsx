import { venues } from "../../data/venues";

function VenuesManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-serif text-[#1B3028]">Venues</h2>
        <button
          className="bg-[#1B3028] text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#C6A56B] hover:text-[#1B3028] transition"
          onClick={() => alert("Venue creation form coming soon.")}
        >
          Add Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((v) => (
          <div
            key={v.id}
            className="bg-white border border-[#E8E3D9] overflow-hidden shadow-sm"
          >
            <img
              src={v.images[0]}
              alt={v.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-serif text-[#1B3028]">{v.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{v.location}</p>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-gray-600">
                  Up to {v.capacity.toLocaleString()} guests
                </span>
                <span className="font-serif text-[#1B3028]">{v.priceLabel}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => alert("Edit venue coming soon.")}
                  className="border border-[#1B3028] text-[#1B3028] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert("Delete venue coming soon.")}
                  className="border border-red-300 text-red-600 px-4 py-2 text-xs uppercase tracking-widest hover:bg-red-50 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenuesManager;
