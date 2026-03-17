<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }
        .container {
            width: 100%;
            padding: 20px;
        }
        h2 {
            text-align: center;
        }
        .info {
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #000;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        .total {
            margin-top: 20px;
            text-align: right;
        }
        .total p {
            margin: 5px 0;
        }
    </style>
</head>
<body>

<div class="container">

    <h2>Banquet Booking Invoice</h2>

    <div class="info">
        <p><strong>Booking ID:</strong> {{ $booking->id }}</p>
        <p><strong>Customer:</strong> {{ $booking->customer->name ?? '' }}</p>
        <p><strong>Location:</strong> {{ $booking->location->name ?? '' }}</p>
        <p><strong>Date:</strong> {{ $booking->event_date }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Hall Name</th>
                <th>Price (₹)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($booking->halls as $hall)
                <tr>
                    <td>{{ $hall->name }}</td>
                    <td>₹ {{ $hall->price ?? 1000 }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        <p><strong>Subtotal: ₹ {{ $total }}</strong></p>
        <p><strong>GST (18%): ₹ {{ $gst }}</strong></p>
        <p><strong>Grand Total: ₹ {{ $grandTotal }}</strong></p>
    </div>

</div>

</body>
</html>