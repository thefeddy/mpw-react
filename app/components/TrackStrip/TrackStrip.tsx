/* SCSS */
import './Trackstrip.scss';

interface TrackStripProps {
    orientation?: 'horizontal' | 'vertical';
    children: React.ReactNode;
}

export default function TrackStrip({ orientation = 'horizontal', children }: TrackStripProps) {
    return (
        <div className={`track-strip --${orientation}`}>
            {children}
        </div>
    );
}