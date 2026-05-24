export const HeaderLine = ({ userType }) => {
    return (
        <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {userType === 'seller' ? 'Property Inquiries' :
                    userType === 'buyer' ? 'My Inquiries' : 'All Inquiries'}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {userType === 'seller' ? 'Manage and respond to buyer inquiries' :
                    userType === 'buyer' ? 'Track your property inquiries' :
                        'Manage all system inquiries'}
            </p>
        </div>
    );
}
