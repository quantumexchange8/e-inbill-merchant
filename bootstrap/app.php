<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\App;
use \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $exception, Request $request) {
            
            if ($exception->getStatusCode() == 400) {
                return response()->view("admin.errors.400", [], 400);
            }

            if ($exception->getStatusCode() == 403) {
                return response()->view("admin.errors.403", [], 403);
            }

            if ($exception->getStatusCode() == 404) {
                return response()->view("errors.error404", [], 404);
            }

            if ($exception->getStatusCode() == 500) {
                return response()->view("errors.error500", [], 500);
            }

            if ($exception->getStatusCode() == 503) {
                return response()->view("admin.errors.503", [], 503);
            }
            
    
            // if ($exception->getStatusCode() == 404) {
            //     return response()->view("customer.errors.404", [], 404);
            // }
        });
    })->create();
