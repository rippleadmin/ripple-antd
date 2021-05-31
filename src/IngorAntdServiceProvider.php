<?php

namespace Ingor\Antd;

use Illuminate\Support\ServiceProvider;
use Ingor\Ingor;

class IngorAntdServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        Ingor::pluginRoutes(__DIR__.'/../routes/ingor-antd.php');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Ingor::js('js/main.js', 'vendor/ingor-antd');
    }
}
