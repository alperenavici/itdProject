// main.mo
actor {
    // Sokak hayvanları bilgileri
    type Animal = {
        id: Nat;
        name: Text;
        species: Text;
        location: Text;
        healthStatus: Text;
        needsHelp: Bool;
        imageUrl: ?Text;
    };

    // Bağış bilgileri
    type Donation = {
        id: Nat;
        amount: Nat;
        message: ?Text;
        timestamp: Int;
    };

    // Veritabanları
    var animals: [Animal] = [];
    var donations: [Donation] = [];
    var nextAnimalId: Nat = 0;
    var nextDonationId: Nat = 0;

    // Hayvan ekleme
    public func addAnimal(
        name: Text,
        species: Text,
        location: Text,
        healthStatus: Text,
        imageUrl: ?Text
    ): async Bool {
        animals := animals # [
            {
                id = nextAnimalId;
                name;
                species;
                location;
                healthStatus;
                needsHelp = false;
                imageUrl;
            }
        ];
        nextAnimalId += 1;
        return true;
    };

    // Tüm hayvanları döndür
    public query func getAllAnimals(): async [Animal] {
        return animals;
    };

    // Bağış yap
    public func makeDonation(amount: Nat, message: ?Text): async Bool {
        donations := donations # [
            {
                id = nextDonationId;
                amount;
                message;
                timestamp = Int.now();
            }
        ];
        nextDonationId += 1;
        return true;
    };

    // Tüm bağışları döndür
    public query func getDonations(): async [Donation] {
        return donations;
    };
}
