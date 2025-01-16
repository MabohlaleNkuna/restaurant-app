const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchReservations = async () => {
        setLoading(true);
        try {
          const response = await api.get('/api/reservations/');
          setReservations(response.data);
        } catch (error) {
          console.error('Error fetching reservations:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchReservations();
    }, []);
  
    return (
      <View style={styles.container}>
        {loading ? <Text>Loading...</Text> : (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.reservation}>
                <Text>{item.restaurant.name}</Text>
                <Text>{item.date} at {item.time}</Text>
                <Text>Party Size: {item.partySize}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Reservation', { reservationId: item._id })}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <Button title="Cancel" onPress={() => handleCancel(item._id)} />
              </View>
            )}
          />
        )}
      </View>
    );
  };
  