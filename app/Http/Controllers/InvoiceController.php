<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function eInvoice()
    {
        return Inertia::render('Einvoice/Einvoice');
    }
}
