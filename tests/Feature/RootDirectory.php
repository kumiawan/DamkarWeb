<?php

it('root directory menarah ke login', function () {
    $response = $this->get('/');

    $response->assertRedirect(route('login'));
});
