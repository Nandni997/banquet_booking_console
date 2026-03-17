<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class InvoiceMail extends Mailable
{
    public $pdf;

    public function __construct($pdf)
    {
        $this->pdf = $pdf;
    }

    public function build()
    {
        return $this->subject('Your Booking Invoice')
                    ->view('emails.invoice')
                    ->attachData($this->pdf->output(), 'invoice.pdf');
    }
}